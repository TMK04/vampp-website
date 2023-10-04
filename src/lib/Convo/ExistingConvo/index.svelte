<script lang="ts">
	import InputsContainer from "$lib/InputsContainer.svelte";
	import PitchInput from "$lib/PitchInput.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import Message from "./Message.svelte";
	import Score from "./Score.svelte";
	import Summary from "./Summary.svelte";

	export let convo: ConvoType;
</script>

<div>
	<Message role="User">
		<InputsContainer>
			<TopicInput topic={convo.topic} />
			<PitchInput pitch={convo.pitch} />
		</InputsContainer>
	</Message>

	<Message role="Beholder">
		<article class="flex flex-wrap gap-2">
			<InputsContainer class="basis-full">
				<Summary>{convo.summary}</Summary>
			</InputsContainer>
			<Score class="basis-1/3" label="Professionalism & Enthusiasm" score={convo.pe}>
				<Score label="Moving" score={convo.moving} format="pct" />
				<Score label="Smiling" score={convo.smiling} format="pct" />
				<Score label="Upright" score={convo.upright} format="pct" />
				<Score label="Eye Contact" score={convo.ec} format="pct" />
				<Score label="Professional Attire" score={convo.pa} format="pct" />
				<Score label="Speech Enthusiasm" score={convo.speech_enthusiasm} format="pct" />
			</Score>
			<Score class="basis-1/3" label="Clarity" score={convo.clarity}>
				<Score label="Speech Clarity" score={convo.speech_clarity} format="pct" />
				<Score label="Content Clarity" score={convo.beholder_clarity} format="1-10 int" />
			</Score>
			<Score class="basis-full" label="Business Value" score={convo.bv}>
				<Score label="Creativity" score={convo.beholder_creativity} format="1-10 int">
					{convo.beholder_creativity_justification}
				</Score>
				<Score label="Feasibility" score={convo.beholder_feasibility} format="1-10 int">
					{convo.beholder_feasibility_justification}
				</Score>
				<Score label="Impact" score={convo.beholder_impact} format="1-10 int">
					{convo.beholder_impact_justification}
				</Score>
			</Score>
		</article>
	</Message>
</div>
