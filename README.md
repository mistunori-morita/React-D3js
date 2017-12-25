# React-D3.js
## App&Component SetUp
- PORTがかぶる場合は`package.json`を編集する
```js
"scripts": {
  "start": "PORT=3007 react-scripts start",
  "build": "react-scripts build",
```
- `npm start`で起動
- 不要なSVGやスクリプトを削除して初期設定を行う
- App.jsを作り込む
```js
import React, { Component } from 'react';
import './App.css';
//コンポーネントを読み込み
import BarChart from './components/BarChart';

class App extends Component {
  //コンストラクタでstateを定義
  constructor(props){
    super(props);
    this.state = {
      //まず仮データ
      data: [100, 400, 232, 200, 233, 120, 78, 162, 390, 20]
    }
  }
  render() {
    return (
      <div className="App">
        <BarChart />
      </div>
    );
  }
}

export default App;


```
- src/components/BarChart.jsを作成(コンポーネントの作成)
```js

import React, { Component } from 'react';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.data
    }
  }
  render() {
    return (
      <div>
       BARCHART
      </div>
    );
  }
}

export default BarChart;
```
