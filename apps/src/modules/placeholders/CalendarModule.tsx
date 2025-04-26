import React, { useState } from 'react';
import { Card, Typography, Calendar, Badge, Modal, Form, Input, DatePicker, Select, Button, TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../types';
import type { Moment } from 'moment';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for calendar events
const mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    start: '2023-05-10 10:00',
    end: '2023-05-10 11:00',
    type: 'success',
    description: 'Weekly team sync'
  },
  {
    id: '2',
    title: 'Product Demo',
    start: '2023-05-15 14:00',
    end: '2023-05-15 15:30',
    type: 'warning',
    description: 'Demo for new clients'
  },
  {
    id: '3',
    title: 'Project Deadline',
    start: '2023-05-20 00:00',
    end: '2023-05-20 23:59',
    type: 'error',
    description: 'Final submission deadline'
  },
  {
    id: '4',
    title: 'Training Session',
    start: '2023-05-25 09:00',
    end: '2023-05-25 12:00',
    type: 'processing',
    description: 'New tool training'
  }
];

const CalendarModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  const showModal = (date: Moment) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      console.log('Create event with values:', values);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getListData = (value: Moment) => {
    const year = value.year();
    const month = value.month() + 1;
    const date = value.date();
    
    // Filter events for this date
    return mockEvents.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() + 1 === month &&
        eventDate.getDate() === date
      );
    });
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events p-0 m-0 list-none">
        {listData.map(item => (
          <li key={item.id} className="mb-1">
            <Badge status={item.type as any} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>{module.name}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => showModal(selectedDate || moment())}
        >
          New Event
        </Button>
      </div>
      
      <Card>
        <Calendar 
          dateCellRender={dateCellRender} 
          onPanelChange={onPanelChange}
          onSelect={showModal}
        />
      </Card>

      <Modal
        title="Create New Event"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okText="Create"
      >
        <Form
          form={form}
          layout="vertical"
          name="create_event_form"
          initialValues={{
            date: selectedDate,
            type: 'success'
          }}
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: 'Please enter an event title' }]}
          >
            <Input placeholder="Team Meeting" />
          </Form.Item>
          
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please select a time range' }]}
          >
            <TimePicker.RangePicker className="w-full" format="HH:mm" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="Event Type"
            rules={[{ required: true, message: 'Please select an event type' }]}
          >
            <Select>
              <Option value="success">Regular</Option>
              <Option value="warning">Important</Option>
              <Option value="error">Urgent</Option>
              <Option value="processing">Information</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={3} placeholder="Event description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarModule;
