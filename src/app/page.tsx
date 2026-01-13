import Hero from "@/components/Hero";
import UnderstandingPCOS from "@/components/UnderstandingPCOS";
import HealthImplications from "@/components/HealthImplications";
import LifestyleManagement from "@/components/LifestyleManagement";
import LivingWithPCOS from "@/components/LivingWithPCOS";
import References from "@/components/References";

export default function Home() {
	return (
		<div className="min-h-screen">
			<Hero />
			<UnderstandingPCOS />
			<HealthImplications />
			<LifestyleManagement />
			<LivingWithPCOS />
			<References />
		</div>
	);
}
