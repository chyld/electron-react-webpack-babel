const React = require('react');
const ipc = require('electron').ipcRenderer

module.exports = class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.quote = this.quote.bind(this);
    this.reply = this.reply.bind(this);
    ipc.on('quote-response', this.reply);
  }

  reply(e, d){
    const price = d[0].l;
    console.log('price:', price);
    this.setState({price});
  }

  quote(){
    console.log('quote');
    ipc.send('quote-request', {symbol: 'aapl'});
  }

  render(){
    return (
      <div>
        <h1>Stock Market</h1>
        <button onClick={this.quote}>Get Quote</button>
        <h3>{this.state.price}</h3>
      </div>
    );
  }
};
