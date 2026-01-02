import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        alert('Message sent! (Mock)');
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-lg mx-auto">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white sm:text-4xl">Contact Us</h2>
                    <p className="mt-4 text-lg text-center text-gray-500 dark:text-gray-400">Have questions? We'd love to hear from you.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white dark:bg-dark-card p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border bg-white dark:bg-gray-800 dark:text-white"
                            />
                            {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border bg-white dark:bg-gray-800 dark:text-white"
                            />
                            {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea
                                {...register('message', { required: true })}
                                rows={4}
                                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border bg-white dark:bg-gray-800 dark:text-white"
                            />
                            {errors.message && <span className="text-red-500 text-xs">Message is required</span>}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ContactPage;
