import { useQuery } from '@tanstack/react-query';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaUsers } from 'react-icons/fa6';
import { TbUsersGroup } from 'react-icons/tb';
import { MdOutlineWorkspacePremium } from 'react-icons/md';

const UsersStats = () => {
    const axiosPublic = useAxiosPublic();
    const countTotalRef = useRef(null);
    const countNormalRef = useRef(null);
    const countPremiumRef = useRef(null);

    const { isFetching, isError, data: countUsers = {} } = useQuery({
        queryKey: ['countUsers'],
        queryFn: async () => {
            const res = await axiosPublic('/users/count');
            return res.data;
        }
    });

    const { total_users = 0, normal_users = 0, premium_users = 0 } = countUsers;

    const totalPercentage = total_users > 0 ? 100 : 0;
    const normalPercentage = total_users > 0 ? ((normal_users / total_users) * 100).toFixed(2) : 0;
    const premiumPercentage = total_users > 0 ? ((premium_users / total_users) * 100).toFixed(2) : 0;

    const { reset: resetTotal, update: updateTotal } = useCountUp({
        ref: countTotalRef,
        start: 0,
        end: total_users,
        delay: 0,
        duration: 10,
    });

    const { reset: resetNormal, update: updateNormal } = useCountUp({
        ref: countNormalRef,
        start: 0,
        end: normal_users,
        delay: 0,
        duration: 10,
    });

    const { reset: resetPremium, update: updatePremium } = useCountUp({
        ref: countPremiumRef,
        start: 0,
        end: premium_users,
        delay: 0,
        duration: 10,
    });

    const { ref: inViewRef, inView } = useInView({
        triggerOnce: false, // trigger every time the component comes into view
        threshold: 0.2, // trigger when 20% of the component is in view
    });

    const [chartData, setChartData] = useState({
        labels: ['Total Users', 'Normal Users', 'Premium Users'],
        datasets: [
            {
                label: 'Users Count',
                data: [totalPercentage, normalPercentage, premiumPercentage],
                backgroundColor: ['#3b82f6', '#34d399', '#f97316'],
            },
        ],
    });

    const setRefs = useCallback(
        (node) => {
            inViewRef(node);
        },
        [inViewRef]
    );

    useEffect(() => {
        if (inView && !isFetching && !isError) {
            resetTotal();
            resetNormal();
            resetPremium();
            updateTotal(total_users);
            updateNormal(normal_users);
            updatePremium(premium_users);

            setChartData({
                labels: ['Total Users', 'Normal Users', 'Premium Users'],
                datasets: [
                    {
                        label: 'Users Count',
                        data: [totalPercentage, normalPercentage, premiumPercentage],
                        backgroundColor: ['#3b82f6', '#34d399', '#f97316'],
                    },
                ],
            });
        }
    }, [inView, total_users, normal_users, premium_users, isFetching, isError, resetTotal, resetNormal, resetPremium, updateTotal, updateNormal, updatePremium, totalPercentage, normalPercentage, premiumPercentage]);

    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            <div ref={setRefs} className='text-4xl font-bold flex flex-col md:flex-row gap-6 items-center justify-center'>
                <div className='flex flex-col items-center gap-4 rounded-lg p-5 border text-[#3b82f6] bg-[#3b83f665] border-[#3b82f6]'>
                    <FaUsers /><div className='flex flex-col gap-2 items-center'>Total Users <span ref={countTotalRef} /></div>
                </div>
                <div className='flex flex-col items-center gap-4 rounded-lg p-5 border bg-[#1d765565] text-[#1d7655] border-[#34d399]'>
                    <TbUsersGroup /> <div className='flex flex-col gap-2 items-center'>Normal Users <span ref={countNormalRef} /></div>
                </div>
                <div className='flex flex-col items-center gap-4 rounded-lg p-5 border bg-[#f9731665] text-[#f97316] border-[#f97316]'>
                    <MdOutlineWorkspacePremium /> <div className='flex flex-col gap-2 items-center'>Premium Users <span ref={countPremiumRef} /></div>
                </div>
            </div>
            <div className='mt-6'>
                <Bar data={chartData} options={{ animation: { duration: 10000 }, scales: { y: { max: 100 } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } } } }} />
            </div>
        </div>
    );
};

export default UsersStats;
