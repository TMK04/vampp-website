<script lang="ts">
	import InputsContainer from "$lib/InputsContainer.svelte";
	import PitchInput from "$lib/PitchInput.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import { decompressVideo } from "$lib/decompress";
	import { onMount } from "svelte";
	import Message from "./Message.svelte";
	import Score from "./Score.svelte";
	import Summary from "./Summary.svelte";

	export let convo: ConvoType;
	$: ({
		pitch_topic,
		pitch_content,
		pitch_summary,
		pe,
		moving,
		smiling,
		upright,
		ec,
		pa,
		speech_enthusiasm,
		clarity,
		speech_clarity,
		pitch_Clarity,
		pitch_Clarity_justification,
		bv,
		pitch_Creativity,
		pitch_Creativity_justification,
		pitch_Feasibility,
		pitch_Feasibility_justification,
		pitch_Impact,
		pitch_Impact_justification
	} = convo);

	let src: string;
	onMount(async () => {
		if (convo.final_video) src = await decompressVideo(convo.final_video);
	});
</script>

<div>
	<Message role="User">
		<InputsContainer>
			<TopicInput {pitch_topic} />
			<PitchInput {pitch_content} />
		</InputsContainer>
	</Message>

	<Message role="Beholder">
		<article class="flex flex-wrap gap-2">
			{#if src}
				<!-- svelte-ignore a11y-media-has-caption -->
				<video class="md:max-w-[70vw] lg:max-w-[55vw]" controls>
					<source type="video/mp4" {src} />
				</video>
			{/if}
			<InputsContainer class="basis-full">
				<Summary {pitch_summary} />
			</InputsContainer>
			<Score class="basis-[300px]" label="Professionalism & Enthusiasm" score={pe}>
				<Score label="Moving" score={moving} format="pct" />
				<Score label="Smiling" score={smiling} format="pct" />
				<Score label="Upright" score={upright} format="pct" />
				<Score label="Eye Contact" score={ec} format="pct" />
				<Score label="Professional Attire" score={pa} format="pct" />
				<Score label="Speech Enthusiasm" score={speech_enthusiasm} format="pct" />
			</Score>
			<Score class="basis-[300px]" label="Clarity" score={clarity}>
				<Score label="Speech Clarity" score={speech_clarity} format="pct" />
				<Score
					label="Content Clarity"
					score={pitch_Clarity}
					format="1-10 int"
					_slot={pitch_Clarity_justification}
				/>
			</Score>
			<Score class="basis-full" label="Business Value" score={bv}>
				<Score
					label="Creativity"
					score={pitch_Creativity}
					format="1-10 int"
					_slot={pitch_Creativity_justification}
				/>
				<Score
					label="Feasibility"
					score={pitch_Feasibility}
					format="1-10 int"
					_slot={pitch_Feasibility_justification}
				/>
				<Score
					label="Impact"
					score={pitch_Impact}
					format="1-10 int"
					_slot={pitch_Impact_justification}
				/>
			</Score>
		</article>
	</Message>
</div>
