export const InputVoucher = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            type="text"
            placeholder="Masukkan kode voucher"
            className="border border-[#C8CCD0] text-xs md:text-base rounded-md py-1 px-2.5 h-10.25 md:h-11.5 text-text-light-primary placeholder:text-text-light-disabled w-full bg-transparent"
            {...props}
        />
    );
};