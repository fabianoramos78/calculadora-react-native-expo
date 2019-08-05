import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      display: '',
      resultado: ''
    }
  }

  handleOp(op) {
    if (op === 'C') {
      this.setState({
        display: '',
        resultado: ''
      })
    } else if (op === '=') {
      this.setState({
        display: this.state.resultado,
        resultado: ''
      })
    } else {
      const display = this.state.display + op
      let resultado = this.state.resultado
      try {
        let fixedOperation = display.split('x').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        fixedOperation = fixedOperation.split(',').join('.')
        resultado = new String(eval(fixedOperation)).toString()
      } catch (e) { }

      this.setState({
        display,
        resultado
      })
    }
  }

  render() {

    const col1Buttons = [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      [',', '0', '=']
    ]
    const col2Buttons = ['C', '÷', 'x', '-', '+']

    return (
      <View style={styles.container} >
        <Text style={styles.display}>{this.state.display}</Text>
        <Text style={styles.resultado}>{this.state.resultado}</Text>
        <View style={styles.buttons}>
          <View style={styles.col1}>
            {col1Buttons.map((linha, ind) =>
              <View key={ind} style={styles.linha}>
                {linha.map(op =>
                  <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                    <Text style={styles.btnText}>
                      {op}
                    </Text>
                  </TouchableOpacity>)}
              </View>
            )}
          </View>
          <View style={styles.col2}>
            {col2Buttons.map(op =>
              <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                <Text style={styles.btnText}>
                  {op}
                </Text>
              </TouchableOpacity>)}
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    backgroundColor: '#efefef',
    fontSize: 60,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  resultado: {
    flex: 0.4,
    backgroundColor: '#efefef',
    fontSize: 30,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10
  },
  buttons: {
    flex: 5,
    flexDirection: 'row'
  },
  col1: {
    flex: 3,
    backgroundColor: '#000000',
  },
  linha: {
    flexDirection: 'row',
    flex: 1
  },
  btn: {
    flex: 1,
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white'
  },
  col2: {
    flex: 1,
    backgroundColor: '#0b0b0b'
  }
});

