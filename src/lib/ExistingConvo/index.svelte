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
			<TopicInput pitch_topic={convo.pitch_topic} />
			<PitchInput pitch_content={convo.pitch_content} />
		</InputsContainer>
	</Message>

	<Message role="Beholder">
		<article class="flex flex-wrap gap-2">
			<InputsContainer class="basis-full">
				<Summary>{convo.pitch_summary}</Summary>
			</InputsContainer>
			<Score class="basis-[300px]" label="Professionalism & Enthusiasm" score={convo.pe}>
				<Score label="Moving" score={convo.moving} format="pct" />
				<Score label="Smiling" score={convo.smiling} format="pct" />
				<Score label="Upright" score={convo.upright} format="pct" />
				<Score label="Eye Contact" score={convo.ec} format="pct" />
				<Score label="Professional Attire" score={convo.pa} format="pct" />
				<Score label="Speech Enthusiasm" score={convo.speech_enthusiasm} format="pct" />
			</Score>
			<Score class="basis-[300px]" label="Clarity" score={convo.clarity}>
				<Score label="Speech Clarity" score={convo.speech_clarity} format="pct" />
				<Score label="Content Clarity" score={convo.pitch_Clarity} format="1-10 int">
					{convo.pitch_Clarity_justification}
				</Score>
			</Score>
			<Score class="basis-full" label="Business Value" score={convo.bv}>
				<Score label="Creativity" score={convo.pitch_Creativity} format="1-10 int">
					{convo.pitch_Creativity_justification}
				</Score>
				<Score label="Feasibility" score={convo.pitch_Feasibility} format="1-10 int">
					{convo.pitch_Feasibility_justification}
				</Score>
				<Score label="Impact" score={convo.pitch_Impact} format="1-10 int">
					{convo.pitch_Impact_justification}
				</Score>
			</Score>
		</article>
	</Message>
</div>
