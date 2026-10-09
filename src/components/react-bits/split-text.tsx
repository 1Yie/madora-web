// Adapted from react-bits (TextAnimations/SplitText) — https://reactbits.dev
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(GSAPSplitText, useGSAP);

type SplitTextProps = {
	text: string;
	className?: string;
	delay?: number;
	duration?: number;
};

export function SplitText({
	text,
	className,
	delay = 0.04,
	duration = 1.1,
}: SplitTextProps) {
	const ref = useRef<HTMLParagraphElement>(null);
	const [fontsReady, setFontsReady] = useState(false);

	// Split only after the webfont is in, otherwise the char boxes measure wrong.
	useEffect(() => {
		void document.fonts.ready.then(() => setFontsReady(true));
	}, []);

	useGSAP(
		() => {
			if (!ref.current || !fontsReady) return;

			const split = new GSAPSplitText(ref.current, {
				type: 'chars',
				charsClass: 'split-char',
			});
			gsap.fromTo(
				split.chars,
				{ opacity: 0, y: 40, rotateX: -70 },
				{
					opacity: 1,
					y: 0,
					rotateX: 0,
					duration,
					ease: 'power4.out',
					stagger: delay,
				}
			);

			return () => split.revert();
		},
		{ dependencies: [fontsReady, text], scope: ref }
	);

	return (
		<p
			className={className}
			ref={ref}
			style={{ perspective: 800, wordBreak: 'keep-all' }}
		>
			{text}
		</p>
	);
}
