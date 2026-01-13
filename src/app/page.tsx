import Hero from "@/components/Hero";
import UnderstandingPCOS from "@/components/UnderstandingPCOS";
import HealthImplications from "@/components/HealthImplications";
import LifestyleManagement from "@/components/LifestyleManagement";
import LivingWithPCOS from "@/components/LivingWithPCOS";
import References from "@/components/References";
import Reveal from "@/components/Reveal";

export default function Home() {
	return (
		<div className="min-h-screen">
			<Reveal>
				<Hero />
			</Reveal>

			<Reveal>
				<UnderstandingPCOS />
			</Reveal>

			<Reveal>
				<HealthImplications />
			</Reveal>

			<Reveal>
				<LifestyleManagement />
			</Reveal>

			<Reveal>
				<LivingWithPCOS />
			</Reveal>

			<Reveal>
				<References />
			</Reveal>
		</div>
	);
}
