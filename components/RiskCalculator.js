import React from 'react';
import useRiskCalculator from '../hooks/useRiskCalculator';
import { useState } from 'react';

const RiskCalculator = () => {
    const {
        probability,
        exposure,
        consequence,
        selectedProbability,
        selectedExposure,
        selectedConsequence,
        riskLevel,
        loading,
        error,
        submissionStatus,
        setSelectedProbability,
        setSelectedExposure,
        setSelectedConsequence,
        handleSubmit,
        selectedConsequenceWeight,
        setSelectedConsequenceWeight
    } = useRiskCalculator();

    const [aliasConsequenceSelected, setAliasConsequenceSelected] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;


    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-blue-700">Risk Calculator</h2>
            <div className='border border-blue-700 rounded-md p-3 mt-4'>
                <div className="mb-4">
                    <label htmlFor="probability" className="block text-sm font-medium text-gray-700">Probability</label>
                    <select
                        id="probability"
                        value={selectedProbability}
                        onChange={(e) => setSelectedProbability(e.target.value)}
                        className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select Probability</option>
                        {probability.map(option => (
                            <option key={option.id} value={option.weight}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="exposure" className="block text-sm font-medium text-gray-700">Exposure</label>
                    <select
                        id="exposure"
                        value={selectedExposure}
                        onChange={(e) => setSelectedExposure(e.target.value)}
                        className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select Exposure</option>
                        {exposure.map(option => (
                            <option key={option.id} value={option.weight}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="consequence" className="block text-sm font-medium text-gray-700">Consequence</label>
                    <select
                        id="consequence"
                        value={selectedConsequence}
                        onChange={(e) => {
                            const selectedOption = consequence.find(option => option.id == e.target.value);
                            setSelectedConsequence(e.target.value);
                            setSelectedConsequenceWeight(selectedOption.weight);
                            setAliasConsequenceSelected(selectedOption.alias)
                        }}
                        className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select Consequence</option>
                        {consequence.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name} ( {option.alias} )
                            </option>
                        ))}
                    </select>
                    {/* <span className='text-black'>{aliasConsequenceSelected}</span> */}

                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-700  px-4 py-2  text-white rounded-md hover:bg-blue-700"
                >
                    Calculate
                </button>

            </div>
            {
                (riskLevel || submissionStatus) &&
                <div className='border border-blue-700 rounded-md p-1 mt-4'>
                    <h2 className='text-blue-700 font-bold'>Result</h2>
                    {riskLevel && (
                        <div className="mt-4 text-lg font-semibold text-gray-700">
                            Risk Level: {riskLevel}
                        </div>
                    )}
                    {submissionStatus && (
                        <div className="mt-1 text-lg font-semibold text-gray-700">
                            {submissionStatus}
                        </div>
                    )}
                </div>
            }


        </div>
    );
};

export default RiskCalculator;
