import React from 'react';
import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';

export interface DatePickerProps extends AntDatePickerProps {
  animated?: boolean;
}

/**
 * Enhanced DatePicker component with animation support
 */
export const DatePicker = React.forwardRef<any, DatePickerProps>(
  ({ animated = true, className = '', popupClassName = '', ...props }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntDatePicker 
          ref={ref} 
          className={`enhanced-datepicker ${className}`} 
          popupClassName={`enhanced-datepicker-popup ${popupClassName}`}
          {...props} 
        />
      );
    }

    return (
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <AntDatePicker 
          ref={ref} 
          className={`enhanced-datepicker ${className}`} 
          popupClassName={`enhanced-datepicker-popup ${popupClassName}`}
          {...props} 
        />
      </motion.div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

// Re-export sub-components
const { RangePicker, TimePicker, QuarterPicker, MonthPicker, WeekPicker, YearPicker } = AntDatePicker;

DatePicker.RangePicker = RangePicker;
DatePicker.TimePicker = TimePicker;
DatePicker.QuarterPicker = QuarterPicker;
DatePicker.MonthPicker = MonthPicker;
DatePicker.WeekPicker = WeekPicker;
DatePicker.YearPicker = YearPicker;

export default DatePicker;