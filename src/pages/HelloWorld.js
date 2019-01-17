import { Button } from 'antd';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
    </div>,
    document.getElementById('root')
);