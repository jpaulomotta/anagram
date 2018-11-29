import React, { Component } from 'react';
import {anagrama} from './discreta/discreta'
import TabelaLetras from './TabelaLetras'
import './App.css';

class App extends Component {
  state = {frase: '', anagramas: 0, letras: {}}
  
  handleChange = (evt) => {
    let frase = evt.target.value.toUpperCase()
    let anagramas = anagrama(frase)

    this.setState({
      frase,
      anagramas: anagramas.total,
      letras: anagramas.quantidade
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h1>Anagramas especiais</h1>
            <p>Resolvedor de anagramas com as seguintes condições:</p>
            <ul>
              <li>As permutações devem ser tais que os espaços não ocorrem subseqüentes (i.e., seguidos) um de outro</li>
              <li>Espaços não ocorrem nas extremidades do anagrama</li>
            </ul>
          </div>
        </header>

        <main>
          <div className="container">
            <form>
              <div className="form-group">
                <label>Escreva uma frase</label>
                <input type="text" className="form-control" onChange={this.handleChange} autoFocus
                value={this.state.frase}/>
              </div>
            </form>
            {this.state.anagramas > 0 ?
              <div>
                <p className="lead">"{this.state.frase}"
                <br/>contem <span className="h3">{this.state.anagramas}</span> anagramas especiais</p>
                
                <h2>Letras</h2>

                <TabelaLetras letras={this.state.letras}/>

                <a href="https://github.com/jpaulomotta/anagram/blob/master/src/discreta/discreta.js" target="_blank" className="btn btn-primary">
                  Ver Código Fonte
                </a>
              </div>
              : <p className="text-muted">Digite uma frase, e eu lhe direi quantos anagramas especiais existem para ela.</p>
            }
          </div>
        </main>
        <footer className="small">
          <hr/>
          <div className="container">
            <p><b>Autor: </b> João Paulo Motta Oliveira Silva</p>
            <p>Apresentado como trabalho para obtenção de grau parcial em Matematica Discreta, pela Universidade Federal de Itajuba.</p>
            <p><b>Professor:</b> Renato Klippert Barcellos</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
