var board;
var game = new Chess();
var messageFieldNumb = $('#messageNumb');
var messageField = $('#message');
var messageFields = [];
var turns = ['w','b','b','w','b','w','w','b','b','w','w','b','w'];
var turnCount = 0;
var kingTaken = false;
var gameOver = false;

messageFields[0] = $('#message0');
messageFields[1] = $('#message1');
messageFields[2] = $('#message2');
messageFields[3] = $('#message3');
messageFields[4] = $('#message4');
messageFields[5] = $('#message5');
messageFields[6] = $('#message6');
messageFields[7] = $('#message7');
messageFields[8] = $('#message8');
messageFields[9] = $('#message9');
messageFields[10] = $('#message10');
messageFields[11] = $('#message11');
messageFields[12] = $('#message12');

// Only move if it is their turn and game is not over.
// Modified chessboardjs.com/examples#5000
function onDragStart(source, piece, position, orientation) {
	if (gameOver
		|| (turns[0] === 'w' && piece.search(/^b/) !== -1)
		|| (turns[0] === 'b' && piece.search(/^w/) !== -1)) {
		return false;
	}
};

// Move if legal
// Modified chessboardjs.com/examples#5000
function onDrop(source, target) {
	let pos = board.position();
	let movingPiece = pos[source];
	let oldFen = game.fen().split(' ');

	let otherColor = (oldFen[1] == 'w' ? 'b' : 'w');
	// End the game if the taken piece is a king of the opposite color
	if (pos[target] == (otherColor + 'K')) {
		console.log('King taken')
		delete pos[source];
		pos[target] = movingPiece;
		board.position(pos, false);
		kingTaken = true;
		updateStatus();
		return;
	}

	var move = game.move({
		from: source,
		to: target,
		promotion: 'q' // TODO Make promotion option
	});

	// Illegal move
	if (move === null) {
		return 'snapback';
	}

	// Update next and future turns
	turnCount = turnCount + 1;
	for (i = 0; i < 12; i++) {
		turns[i] = (bitSum(turnCount + i) === 0 ? 'w' : 'b');
	}

	// Update game fen
	let fen = game.fen().split(' ');

	// Remove info about en passant target square if the same player is moving
	// again
	if (oldFen[1] == turns[0]) {
		fen[3] = '-';
	}
	fen[1] = turns[0];
	fen[5] = turnCount;
	game.load(fen.join(' '));

	updateStatus();
};

function bitSum(i) {
	var sum = 0;
	while (i > 0) {
		sum = sum + i % 2;
		i = Math.floor(i / 2);
	}
	return sum%2;
};

// Update the turn
// Modified chessboardjs.com/examples#5000
function updateStatus() {
	var messageNumb = turnCount.toString();
	var message = '';
	var moveColor = 'White';
	var messages = [];
	var moveColors = [];

	for (i = 0; i <= 12; i++) {
		messages[i] = '';
		moveColors[i] = (turns[i] === 'b' ? 'Black' : 'White');
	}

	if (game.in_checkmate()) {
		gameOver = true;
		message = 'Game over: ' + moveColors[0] + ' is checkmated.';
	}
	else if (game.in_draw()) {
		gameOver = true;
		message = 'Game over: Draw';
	}
	else if (kingTaken) {
		gameOver = true;
		message = 'Game over: King taken';
	}
	else {
		message = 'No Check';

		for (i = 0; i <= 12; i++) {
			messages[i] = moveColors[i] + ' to move';
		}

		if (game.in_check() === true) {
			message = moveColors[0] + ' is in check';
		}
	}

	messageFieldNumb.html(messageNumb);
	messageField.html(message);
	for (i = 0; i <= 12; i++) {
		messageFields[i].html(messages[i]);
	}
};

// Update board for things like en passant
function onSnapEnd() {
	// Board was already changed and disabled if the king was taken
	if (!kingTaken) {
		board.position(game.fen());
		console.log(game.fen());
	}
}

var init = function() {
	var boardConfig = {
		draggable: true,
		dropOffBoard: 'snapback',
		onDragStart: onDragStart,
		onDrop: onDrop,
		onSnapEnd: onSnapEnd,
		position: 'start'
	};

	board = ChessBoard('board', boardConfig);
	updateStatus();
};

$(document).ready(init);
