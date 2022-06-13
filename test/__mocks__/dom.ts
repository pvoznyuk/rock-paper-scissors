export default `
	<header>
		<h1 id="game-name" class="game__name">Rock ✕ Paper ✕ Scissors</h1>
	</header>

	<main class="game">
		<section class="game__players">

			<div class="player player--1">
				<div class="player__weapon"></div>
				<div class="player__info">
					<h2 class="player__name"></h2>
					<p class="player__score">Score: <span>0</span></p>
				</div>
			</div>

			<div class="player player--2">
				<div class="player__weapon"></div>
				<div class="player__info">
					<h2 class="player__name"></h2>
					<p class="player__score">Score: <span>0</span></p>
				</div>
			</div>

		</section>

		<section class="game__result">
			<div class="game__result-text"></div>
			<button id="next" class="button">Next round</button>
		</section>
	</main>

	<footer class="footer">
		<nav class="footer__controls" >
			<button class="button" id="reset">Reset</button>
		</nav>
	</footer>
`;
