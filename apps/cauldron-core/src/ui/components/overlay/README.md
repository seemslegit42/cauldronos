# Overlay Components

This directory contains overlay components for CauldronOS.

## Components

- `Modal` - Enhanced modal component
- `Drawer` - Enhanced drawer component
- `Popover` - Enhanced popover component
- `Tooltip` - Enhanced tooltip component
- `Popconfirm` - Enhanced popconfirm component

## Usage

```jsx
import { Modal, Drawer, Tooltip } from '@ui/components/overlay';
import { Button } from '@ui/components';

function OverlayExample() {
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <div>
      <Tooltip title="Click to open modal">
        <Button onClick={() => setModalVisible(true)}>Open Modal</Button>
      </Tooltip>
      <Button onClick={() => setDrawerVisible(true)}>Open Drawer</Button>

      <Modal
        title="Example Modal"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <p>Modal content goes here</p>
      </Modal>

      <Drawer
        title="Example Drawer"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <p>Drawer content goes here</p>
      </Drawer>
    </div>
  );
}
```
