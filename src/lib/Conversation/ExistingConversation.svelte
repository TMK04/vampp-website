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
			<Score label="Business Value" score={conversation.bv}></Score>
		</article>
	</Message>
</div>
