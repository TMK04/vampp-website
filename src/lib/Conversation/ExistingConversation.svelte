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
			<Score label="Professionalism & Enthusiasm" score={conversation.pe}></Score>
			<Score label="Clarity" score={conversation.clarity}></Score>
			<Score label="Business Value" score={conversation.bv}>
				<Score label="Creativity" score={conversation.beholder_creativity}>
					{conversation.beholder_creativity_justification}
				</Score>
				<Score label="Feasibility" score={conversation.beholder_feasibility}>
					{conversation.beholder_feasibility_justification}
				</Score>
				<Score label="Impact" score={conversation.beholder_impact}>
					{conversation.beholder_impact_justification}
				</Score>
			</Score>
		</article>
	</Message>
</div>
