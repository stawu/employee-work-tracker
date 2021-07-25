using System;
using Date = System.DateTime;

namespace EWT_Application.Queries
{
    public class ShortWorkSummary
    {
        public enum DayStatus
        {
            PROBLEM,
            PRESENCE,
            NO_DATA
        }

        public uint MinutesOfWork { get; set; }
        public (Date date, DayStatus dayStatus)[] DaysStatuses { get; private set; }
        public DateTime StartDateTime { get; private set; }
        public DateTime EndDateTime { get; private set; }

        public ShortWorkSummary(DateTime startDateTime, DateTime endDateTime)
        {
            if (startDateTime > endDateTime)
                throw new ArgumentException();

            StartDateTime = startDateTime;
            EndDateTime = endDateTime;

            uint daysBetweenStartDateAndEndDate = (uint)Math.Ceiling((endDateTime - startDateTime).TotalDays);
            DaysStatuses = new (Date date, DayStatus dayStatus)[daysBetweenStartDateAndEndDate +1];

            InitDaysStatusesArrayWithDefaultValues();
        }

        public void SetStatusOfDay(DateTime dateTimeOfDay, DayStatus status)
        {
            if(dateTimeOfDay < StartDateTime || dateTimeOfDay > EndDateTime)
                throw new ArgumentException();

            Date date = dateTimeOfDay.Date;

            int daysOffsetFromStart = (date - StartDateTime.Date).Days;
            DaysStatuses[daysOffsetFromStart].dayStatus = status;
        }

        private void InitDaysStatusesArrayWithDefaultValues()
        {
            for (int i = 0; i < DaysStatuses.Length; i++)
            {
                DaysStatuses[i].date = StartDateTime.Date.AddDays(i);
                DaysStatuses[i].dayStatus = DayStatus.NO_DATA;
            }
        }
    }
}