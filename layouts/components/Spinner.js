import React from 'react';
import { CircleLoader } from 'react-spinners';

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircleLoader size={200} />
      </div>
    );
  }
}