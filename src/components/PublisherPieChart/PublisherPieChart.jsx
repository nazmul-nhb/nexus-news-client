import PropTypes from 'prop-types';
import Chart from "react-google-charts";

const PublisherPieChart = ({ publicationData }) => {
    return (
        <div className='mx-auto w-full h-auto text-center'>
            {publicationData.length > 1 && (
                <Chart
                    chartType="PieChart"
                    width={'100%'}
                    height={'640px'}
                    loader={<div>Loading Chart...</div>}
                    data={publicationData}
                    options={{
                        backgroundColor:'transparent',
                        color:'red',
                        theme:'material',
                        title: 'Articles by Publishers', is3D: true,
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            )}
        </div>
    );
};

PublisherPieChart.propTypes = {
    publicationData: PropTypes.array,
}

export default PublisherPieChart;