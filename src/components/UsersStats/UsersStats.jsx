import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const UsersStats = () => {
    const axiosPublic = useAxiosPublic();
    const countTotalRef = useRef(null);
    const countNormalRef = useRef(null);
    const countPremiumRef = useRef(null);

    const { isFetching, isError, error, data: countUsers = {} } = useQuery({
        queryKey: ['countUsers'],
        queryFn: async () => {
            const res = await axiosPublic('/users-count');
            return res.data;
        }
    });

    const { total_users = 0, normal_users = 0, premium_users = 0 } = countUsers;

    const { start: startTotal, reset: resetTotal, update: updateTotal } = useCountUp({
        ref: countTotalRef,
        start: 0,
        end: total_users,
        delay: 0,
        duration: 10,
    });

    const { start: startNormal, reset: resetNormal, update: updateNormal } = useCountUp({
        ref: countNormalRef,
        start: 0,
        end: normal_users,
        delay: 0,
        duration: 10,
    });

    const { start: startPremium, reset: resetPremium, update: updatePremium } = useCountUp({
        ref: countPremiumRef,
        start: 0,
        end: premium_users,
        delay: 0,
        duration: 10,
    });

    const { ref: inViewRef, inView } = useInView({
        triggerOnce: false, // Trigger every time the component comes into view
        threshold: 0.1, // Trigger when 10% of the component is in view
    });

    const [chartData, setChartData] = useState({
        labels: ['Total Users', 'Normal Users', 'Premium Users'],
        datasets: [
            {
                label: 'Users Count',
                data: [0, 0, 0],
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
                        data: [total_users, normal_users, premium_users],
                        backgroundColor: ['#3b82f6', '#34d399', '#f97316'],
                    },
                ],
            });
        }
    }, [inView, total_users, normal_users, premium_users, isFetching, isError, resetTotal, resetNormal, resetPremium, updateTotal, updateNormal, updatePremium]);

    return (
        <div ref={setRefs} className='text-4xl flex flex-col items-center justify-center'>
            <div className='flex items-center gap-4'>
                <div>Total Users: <span ref={countTotalRef} /></div>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <div>Normal Users: <span ref={countNormalRef} /></div>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <div>Premium Users: <span ref={countPremiumRef} /></div>
            </div>
            <div className='mt-8 w-full max-w-md'>
                <Bar data={chartData} options={{ animation: { duration: 10000 } }} />
            </div>
        </div>
    );
};

export default UsersStats;
