import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type Plan } from "../../store/useAuthStore";
import axiosInstance from "../../services/api/axiosInstance";
import { PricingCard } from "../molecules/PricingCard";

export const PricingSection = () => {
    const setSelectedPlan = useAuthStore((state) => state.setSelectedPlan);
    const navigate = useNavigate();

    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axiosInstance.get('/plans');
                setPlans(response.data);
            } catch (error) {
                console.error("Gagal mengambil data paket langganan:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleSubscriptionClick = (plan: Plan) => {
        setSelectedPlan(plan);
        navigate("/payment");
    };

    return (
        <section className="flex flex-col items-center text-center gap-10 bg-other-paper px-10.5 py-10 lg:px-20 lg:py-10 w-full mt-0">
            <div className="flex flex-col items-center gap-1.5 lg:gap-3">
                <h2 className="text-white font-bold text-xl lg:text-[32px]">Pilih Paketmu</h2>
                <p className="text-white font-medium text-sm lg:text-lg">
                    Temukan paket sesuai kebutuhanmu!
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-18 max-w-7xl justify-center items-center lg:items-stretch">
                {loading ? (
                    <p className="text-white">Memuat paket langganan...</p>
                ) : (
                    plans.map((plan) => (
                        <PricingCard
                            key={plan.title}
                            {...plan}
                            onClick={() => handleSubscriptionClick(plan)}
                        />
                    ))
                )}
            </div>
        </section>
    );
};