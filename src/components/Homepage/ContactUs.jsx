import { Button } from '../Shared/Button';

export const ContactUs = () => {
  return (
    <section className="py-20 bg-[url('https://i.ibb.co/hXvVCKX/appointment.png')]">
      <div className="text-center">
        <h2 className="text-xl text-secondary capitalize">Contact us</h2>
        <h3 className="text-2xl lg:text-4xl text-base-100">Stay connected with us</h3>
      </div>

      <form className="mt-8 flex flex-col items-center gap-y-4 px-4 lg:px-0">
        <input type="text" placeholder="Email Address" class="input w-full max-w-sm" />
        <input type="text" placeholder="Subject" class="input w-full max-w-sm" />
        <textarea
          class="textarea  w-full max-w-sm min-h-[136px] max-h-[200px]"
          placeholder="Your message"
        ></textarea>
        <Button text="submit" className="mx-auto" />
      </form>
    </section>
  );
};
