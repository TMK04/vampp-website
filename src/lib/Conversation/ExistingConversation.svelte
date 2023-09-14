<script lang="ts">
	import InputsContainer from "$lib/InputsContainer.svelte";
	import PitchInput from "$lib/PitchInput.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdInput from "$lib/YtIdInput.svelte";
	import Message from "./Message.svelte";
	import Score from "./Score.svelte";

	export let conversation: Conversation;

	console.log(conversation);
</script>

<div>
	<Message role="User">
		<InputsContainer>
			<TopicInput topic={conversation.topic} />
			<PitchInput pitch={conversation.pitch} />
		</InputsContainer>
	</Message>

	<Message role="Beholder">
		<article class="flex flex-wrap gap-2">
			<Score label="Professionalism & Enthusiasm" score={conversation.pe}>
				<Score label="Moving" score={conversation.moving} />
				<Score label="Smiling" score={conversation.smiling} />
				<Score label="Upright" score={conversation.upright} />
				<Score label="Eye Contact" score={conversation.ec} />
				<Score label="Professional Attire" score={+conversation.professional_attire} />
			</Score>
			<Score label="Clarity" score={conversation.clarity}>
				<Score label="Speech Clarity" score={conversation.speech_clarity} />
				<Score label="Content Clarity" score={conversation.beholder_clarity} />
			</Score>
			<Score label="Business Value" score={conversation.bv}>
				<Score label="Creativity" score={conversation.beholder_creativity} level={1}>
					{conversation.beholder_creativity_justification}
				</Score>
				<Score label="Feasibility" score={conversation.beholder_feasibility} level={1}>
					{conversation.beholder_feasibility_justification}
				</Score>
				<Score label="Impact" score={conversation.beholder_impact} level={1}>
					{conversation.beholder_impact_justification}
				</Score>
			</Score>
		</article>
	</Message>
</div>
