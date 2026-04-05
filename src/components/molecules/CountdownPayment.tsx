import Countdown from "react-countdown";
import { CountdownBox } from "../atoms/CountdownBox";

const countdownValue = Date.now() + 500000;

export const CountdownPayment = () => {
    return (
        <section className="bg-other-paper p-6 rounded-xl text-text-light-primary text-center">
            <h2 className="mb-2 md:mb-4 text-sm md:text-base">
                Lakukan Pembayaran Sebelum
            </h2>
            <Countdown
                date={countdownValue}
                renderer={({ hours, minutes, seconds }) => (
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <CountdownBox value={hours} label="Jam" />
                        <p className="text-xl font-bold">:</p>
                        <CountdownBox value={minutes} label="Menit" />
                        <p className="text-xl font-bold">:</p>
                        <CountdownBox value={seconds} label="Detik" />
                    </div>
                )}
            />
        </section>
    );
};