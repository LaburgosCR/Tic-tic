import React, { Component } from "react";
import Board from "./Board";
import PropTypes from "prop-types";

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			xIsNext: true,
			stepNumber: 0,
			history: [{ squares: Array(9).fill(null) }]
		};
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext1: step % 2 === 0
		});
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const winner = calculateWinner(squares);
		if (winner || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat({
				squares: squares
			}),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const moves = history.map((step, move) => {
			const desc = move ? "Go to #" + move : "Start the Game";
			return (
				<li key={move}>
					<button
						onClick={() => {
							this.jumpTo(move);
						}}>
						{desc}
					</button>
				</li>
			);
		});
		let status;
		if (winner) {
			status = "Winner is " + winner;
		} else {
			status = "Next Player is " + (this.state.xIsNext ? "X" : "O");
		}

		return (
			<div className="game">
				<img src="data:image/png;base64,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" />
				<div className="game-board">
					<Board
						onClick={i => this.handleClick(i)}
						square={current.squares}
					/>
				</div>
				<div className="Game infor">
					<div>{status}</div>
					<ul>{moves}</ul>
				</div>
			</div>
		);
	}
}

//revisar aqui el codigo para ver si removemos la S de squares
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[b] === squares[c]
		) {
			return squares[a];
		}
	}
	//fijarse aca si en lugar de ; es :
	return null;
}

Game.propTypes = {
	handleClick: PropTypes.func
};
