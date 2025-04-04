import React from 'react';
import { DotLoader } from 'react-spinners';

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLoader size={200} color="rgba(10, 168, 167, 1)"/>
      </div>
    );
  }
}