import React, { Component } from 'react';
import styles from './index.css';

class GameRow extends Component {
  changeCode = (ind, dir)=>{
    this.props.onChangeGuess(
      this.props.code.map( (d, i) =>
        (i !== ind) ? d : (dir === 'up') ? (
          (d + 1) % this.props.dotArity
        ) : (
          (d + this.props.dotArity - 1) % this.props.dotArity
        )
      )
    );
  }

  render(){
    return (
      <div style={styles.guessRow}>
        {
          this.props.code.map( (dot, i) => (
            <div key={i+''+dot}
                 style={styles.guessRowCol}>
              <button onClick={()=> this.changeCode(i, 'up')}
                      className="change-dot-up"
                      disabled={!!this.props.score}> + </button>
              
              <div style={
                Object.assign({}, styles.guessRowDot,
                              styles['dot'+dot])}
              ></div>
              
              <button onClick={()=> this.changeCode(i, 'dn')}
                      className="change-dot-dn"
                      disabled={!!this.props.score}> - </button>
            </div>
          ) )
        }
        <div style={styles.scoreContainer}>
          {
            this.props.score ?
            this.props.code.map( (c, i) => {
              const sdc = (i < this.props.score[0]) ?
                          styles.scoreDotBlack :
                          (i < this.props.score[0] + this.props.score[1]) ?
                          styles.scoreDotPink : styles.scoreDotNone;
              
              return (<div key={i} style={
                Object.assign({}, styles.scoreDot, sdc)}></div>);
            }) :
            <button onClick={this.props.onGuess}
                    className="make-guess">
              GO!
            </button>
          }
        </div>
      </div>
    );
  }
}

GameRow.propTypes = {
  onGuess: React.PropTypes.func,
  onChangeGuess: React.PropTypes.func,
  score: React.PropTypes.array,
  code: React.PropTypes.array.isRequired,
  dotArity: React.PropTypes.number.isRequired,
};

export default GameRow;
