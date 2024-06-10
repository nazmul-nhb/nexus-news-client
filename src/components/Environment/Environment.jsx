import SectionHeader from "../SectionHeader/SectionHeader";
import { useContext } from 'react';
import envData from './environment.json';
import { ThemeContext } from '../../providers/ThemeProvider';
import green from '../../assets/logo-earth.png'

const Environment = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <section className="w-full mx-auto ">
            {/* Will be updated after getting assignment result */}
            <SectionHeader heading={'Commitment to the Environment'} subHeading={'We recognize our responsibility to protect and preserve the environment. Our mission is to reduce our environmental impact through sustainable practices and to support environmental causes through responsible journalism.'}/>
            <div className="flex flex-col items-center mb-4">
                <img className='w-4/5 md:w-[480px]' src={green} alt="Earth" />
            </div>
            <div className="space-y-1 text-nexus-primary">
                {envData.map((env, index) => (
                    <details
                        key={index}
                        className="w-full border shadow-sm shadow-nexus-primary"
                    >
                        <summary className="px-4 py-6 focus:outline-none cursor-pointer text-lg md:text-xl font-semibold">
                            {env.question}
                        </summary>
                        <p className={`px-4 py-6 pt-0 ml-4 -mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                            {env.answer}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
};

export default Environment;