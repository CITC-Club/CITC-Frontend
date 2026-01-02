import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-900 text-white pt-16 pb-8 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <img src="/logo.png" alt="NCIT CITC" className="h-12 w-auto mb-4" />
                        <p className="mt-4 text-gray-300 max-w-md leading-relaxed">
                            Computer Engineering Innovation & Tech Club. Fostering innovation, collaboration, and technical excellence among students.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-300 hover:text-primary transition-colors"><FaGithub size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-primary transition-colors"><FaLinkedin size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-primary transition-colors"><FaInstagram size={24} /></a>
                            <a href="mailto:contact@citc.com" className="text-gray-300 hover:text-primary transition-colors"><FaEnvelope size={24} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/events" className="text-gray-300 hover:text-primary transition-colors">Events</Link></li>
                            <li><Link to="/projects" className="text-gray-300 hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link to="/team" className="text-gray-300 hover:text-primary transition-colors">Our Team</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Kathmandu Engineering College,<br />
                            Kalimati, Kathmandu<br />
                            <a href="mailto:contact@citc.com" className="hover:text-primary transition-colors">contact@citc.com</a>
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} CITC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
