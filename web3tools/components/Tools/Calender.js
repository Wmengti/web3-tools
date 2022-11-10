import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  AppointmentForm,
  DateNavigator,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  DragDropProvider,
  EditRecurrenceMenu,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Grid, Paper } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { style } from '@mui/system';
import { useState } from 'react';
import { useAccount } from 'wagmi';

const Calender = () => {
  const theme = useTheme();
  const { address } = useAccount();
  const [data, setData] = useState();

  const [AppointmentColor, SetAppointmentColor] = useState();
  console.log(AppointmentColor);
  const selectColor = {
    1: '#FFC107',
    2: '#2196f3',
    3: '#9c27b0',
    4: '#f44336',
    5: '#673ab7',
    6: '#4caf50',
    7: '#ff9800',
  };
  console.log(theme);
  const dragDisableIds = new Set([3, 8, 10, 12]);
  const allowDrag = ({ id }) => !dragDisableIds.has(id);
  const TimeTableCell = styled(DayView.TimeScaleLabel)(({ theme }) => ({
    '& .Label-text': {
      fontSize: '1.3rem',
    },
  }));

  const WeekTimeTableCell = styled(WeekView.TimeScaleLabel)(({ theme }) => ({
    '& .Label-text': {
      fontSize: '1.3rem',
    },
  }));

  const MonthTimeTableCell = styled(MonthView.TimeTableCell)(({ theme }) => ({
    fontSize: '2rem',
  }));

  const TodayComponent = styled(TodayButton.Button)(({ theme }) => ({
    fontSize: '1.5rem',
  }));
  const NavigatorButton = ({ children, style, ...restProps }) => (
    <DateNavigator.OpenButton
      {...restProps}
      style={{
        ...style,
        fontSize: '2rem',
        color: theme.palette.text.primary,
      }}
    >
      {children}
    </DateNavigator.OpenButton>
  );

  const Appointment = ({ children, data, ...restProps }) => (
    <Appointments.Appointment
      style={{
        ...style,
        backgroundColor: selectColor[data.color],
        borderRadius: '8px',
      }}
      data={data}
      {...restProps}
    >
      {children}
    </Appointments.Appointment>
  );

  const saveAppointment = async ({ added, changed, deleted }) => {
    let data;
    setData((prevData) => {
      if (added) {
        const startingAddedId =
          prevData?.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
        if (prevData) {
          data = [...prevData, { id: startingAddedId, ...added }];
        } else {
          data = [{ id: startingAddedId, ...added }];
        }
      }
      if (changed) {
        data = prevData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = prevData.filter((appointment) => appointment.id !== deleted);
      }

      return data;
    });
    const updata = { address: address, time: new Date(), data: data };

    const response = await fetch('/api/Calender', {
      method: 'POST',
      body: JSON.stringify(updata),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();

    console.log(responseData);
  };

  console.log(data);
  const Content = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems='center'>
        <Grid item xs={10} p='2.5rem'>
          <span>{appointmentData.customField}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  );

  const Layout = styled(AppointmentForm.Overlay)(({ theme }) => ({
    '& .Overlay-halfSize': {
      maxWidth: '100%',
    },
    '& .Overlay-fullSize': {
      maxWidth: '100%',
    },
  }));
  const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null;
    }
    return <AppointmentForm.TextEditor {...props} />;
  };

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
      onFieldChange({ customField: nextValue });
    };
    const onAppointmentColor = (nextValue) => {
      onFieldChange({ color: nextValue });
      SetAppointmentColor(nextValue);
    };

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Select
          value={appointmentData.color}
          onValueChange={onAppointmentColor}
          availableOptions={[
            { id: 1, text: 'yellow' },
            { id: 2, text: 'blue' },
            { id: 3, text: 'purple' },
            { id: 4, text: 'red' },
            { id: 5, text: 'deepPurple' },
            { id: 6, text: 'green' },
            { id: 7, text: 'orange' },
          ]}
          sx={{ width: '8rem', backgroundColor: selectColor[AppointmentColor] }}
        ></AppointmentForm.Select>
        <AppointmentForm.TextEditor
          value={appointmentData.customField}
          onValueChange={onCustomFieldChange}
          type='multilineTextEditor'
          placeholder='Write notes'
        />
      </AppointmentForm.BasicLayout>
    );
  };

  return (
    <Scheduler height={600} data={data}>
      <ViewState defaultCurrentDate={new Date()} />
      <EditingState onCommitChanges={saveAppointment} />
      <IntegratedEditing />
      <EditRecurrenceMenu />
      <MonthView timeTableCellComponent={MonthTimeTableCell} />
      <WeekView
        startDayHour={9}
        endDayHour={21}
        timeScaleLabelComponent={WeekTimeTableCell}
      />
      <DayView
        startDayHour={9}
        endDayHour={21}
        timeScaleLabelComponent={TimeTableCell}
      />
      <Toolbar />
      <DateNavigator openButtonComponent={NavigatorButton} />
      <TodayButton buttonComponent={TodayComponent} />

      <ViewSwitcher />
      <Appointments appointmentComponent={Appointment} />
      <ConfirmationDialog />
      <AppointmentTooltip
        showOpenButton
        showDeleteButton
        contentComponent={Content}
      />

      <AppointmentForm
        overlayComponent={Layout}
        basicLayoutComponent={BasicLayout}
        textEditorComponent={TextEditor}
      />

      <DragDropProvider allowDrag={allowDrag} />
    </Scheduler>
  );
};

export default Calender;
