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

## simpleBarchart setting
- `npm install --save d3`
- `npm install --save react-faux-dom`
- 完了後`npm start`
- BarChartを編集
```js
//npmした二つのライブラリをインポート
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
```

```js
import React, { Component } from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:props.data
    }
  }

//デフォルトの状態を設定
  static defaultProps = {
    height:500,
    width:500,
    chartBg: '#f4f4f4',
    barColor: 'steelBlue',
    barWidth: 40,
    barOffset: 5
  }
  render() {
      const chart = ReactFauxDOM.createElement('div');

      //barの形やスタイルを定義
      d3.select(chart).append('svg')
        .attr('width',this.props.width)
        .attr('height',this.props.height)
        .selectAll('rect')
        .data(this.state.data)
        .enter().append('rect')
          .style('fill',this.props.barColor)
          .attr('width', this.props.barWidth)
          .attr('height', (d) => {
            return d;
          })
          .attr('x', (d, i) => {
            return i * (this.props.barWidth + this.props. barOffset)
          })
          .attr('y', (d) => {
            return this.props.height - d;
          })

      return chart.toReact();
    }

}

export default BarChart;
//この状態で青色のバーが表示されていたら成功
```
- App.jsのコンストラクタで定義したdataを変更すると
```
constructor(props){
  super(props);
  this.state = {
    //ここを減らすとChartの青色のバーも減る
    data: [100, 400, 232, 200, 233, 120, 78]
  }
}
```

## X,Y スケールの追加
- BarChartを編集
```js
constructor(props){
  super(props);
  this.state = {
    data:props.data,
    //追加
    yScale: '',
    xScale: ''
  }
}

//関数を作成
setYScalse() {
  console.log('Setting Y Scalse...');
  let y = d3.scaleLinear()
    .domain([0, d3.max(this.state.data)])
    .range([0, this.props.height]);

    this.setState({
      yScale: y
    });
}

componentWillMount(){
  this.setYScalse();
}
//xについてもsetYScalseをコピーして作成する

setXScalse() {
  console.log('Setting X Scalse...');
  let x = d3.scaleBand()
    .domain(d3.range(0, this.state.data.length))
    .range([0, this.props.width]);

    this.setState({
      xScale: x
    });
}


componentWillMount(){
  this.setYScalse();
  //setXScalseも呼び出し
  this.setXScalse();
}


//この部分を修正
.attr('height', (d) => {
  // return d;
  return this.state.yScale(d);
})
.attr('x', (d, i) => {
  // return i * (this.props.barWidth + this.props. barOffset)
  return this.state.xScale(i);
})
.attr('y', (d) => {
  // return this.props.height - d;
  return this.props.height - this.state.yScale(d);
})


```
- これでX、Yのバーの高さのスケールが調整されている


## hoverChartBar
- BarChartに追記
```js

render() {
    const chart = ReactFauxDOM.createElement('div');
    //tooltipのスタイルをappendして追加
    let tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('background', '#ccc')
      .style('opacity', '0')
      .style('padding', '10px')
      .style('border', '1px #000 solid')
      .style('border-radius', '5px')
```

- eventの紐付け
```js
//hoverした時に変化をさせたいのでイベントの設定
//こうしてイベントを設定するとコンソールログにオブジェクトの数字が出てくる
.on('mouseover', (d) => {
  console.log(d);
})

return chart.toReact();

//🔽書き換えるとこうなる
.on('mouseover', (d) => {
  tooltip.style('opacity', 1);
  tooltip.html(d)
    .style('left', (d3.event.pageX) + 'px')
    .style('top', (d3.event.pageY) + 'px')
})

//mouseoutした時の設定も続けて書いておくとベスト
.on('mouseout', (d) => {
  tooltip.style('opacity', 0);
})


```
