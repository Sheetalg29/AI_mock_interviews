import React, { useState } from 'react';

const AIMockInterviewForm = () => {
  const [formData, setFormData] = useState({
    candidateID: '',
    interviewDateTime: '',
    speechClarity: '',
    answerCoherence: '',
    nonVerbalCommunication: [],
    confidenceObserved: '',
    hesitations: '',
    signsObserved: [],
    overallAnxietyRating: '',
    answerAccuracy: '',
    problemSolvingApproach: '',
    additionalNotes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let updatedArray = [...formData[name]];
      if (checked) {
        updatedArray.push(value);
      } else {
        updatedArray = updatedArray.filter(v => v !== value);
      }
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // Add API or backend submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Candidate ID:
        <input type="text" name="candidateID" value={formData.candidateID} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Interview Date & Time:
        <input type="datetime-local" name="interviewDateTime" value={formData.interviewDateTime} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Speech Clarity:
        <select name="speechClarity" value={formData.speechClarity} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Very Clear">Very Clear</option>
          <option value="Clear">Clear</option>
          <option value="Somewhat Clear">Somewhat Clear</option>
          <option value="Not Clear">Not Clear</option>
        </select>
      </label>
      <br />
      <label>
        Answer Coherence:
        <select name="answerCoherence" value={formData.answerCoherence} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Very Coherent">Very Coherent</option>
          <option value="Coherent">Coherent</option>
          <option value="Somewhat Coherent">Somewhat Coherent</option>
          <option value="Not Coherent">Not Coherent</option>
        </select>
      </label>
      <br />
      <fieldset>
        <legend>Non-Verbal Communication (Check all that apply):</legend>
        <label><input type="checkbox" name="nonVerbalCommunication" value="Eye Contact" onChange={handleChange} /> Eye Contact</label>
        <label><input type="checkbox" name="nonVerbalCommunication" value="Appropriate Gestures" onChange={handleChange} /> Appropriate Gestures</label>
        <label><input type="checkbox" name="nonVerbalCommunication" value="Facial Expressions" onChange={handleChange} /> Facial Expressions</label>
        <label><input type="checkbox" name="nonVerbalCommunication" value="None" onChange={handleChange} /> None</label>
      </fieldset>
      <br />
      <label>
        Confidence Observed:
        <select name="confidenceObserved" value={formData.confidenceObserved} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Very Confident">Very Confident</option>
          <option value="Confident">Confident</option>
          <option value="Neutral">Neutral</option>
          <option value="Lacking Confidence">Lacking Confidence</option>
        </select>
      </label>
      <br />
      <label>
        Hesitations:
        <select name="hesitations" value={formData.hesitations} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Rare">Rare</option>
          <option value="Occasional">Occasional</option>
          <option value="Frequent">Frequent</option>
        </select>
      </label>
      <br />
      <fieldset>
        <legend>Signs of Anxiety Observed (Check all that apply):</legend>
        <label><input type="checkbox" name="signsObserved" value="Fidgeting" onChange={handleChange} /> Fidgeting</label>
        <label><input type="checkbox" name="signsObserved" value="Sweating" onChange={handleChange} /> Sweating</label>
        <label><input type="checkbox" name="signsObserved" value="Voice Trembling" onChange={handleChange} /> Voice Trembling</label>
        <label><input type="checkbox" name="signsObserved" value="Rapid Speech" onChange={handleChange} /> Rapid Speech</label>
        <label><input type="checkbox" name="signsObserved" value="None" onChange={handleChange} /> None</label>
      </fieldset>
      <br />
      <label>
        Overall Anxiety Rating:
        <select name="overallAnxietyRating" value={formData.overallAnxietyRating} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
      </label>
      <br />
      <label>
        Answer Accuracy:
        <select name="answerAccuracy" value={formData.answerAccuracy} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Correct">Correct</option>
          <option value="Partially Correct">Partially Correct</option>
          <option value="Incorrect">Incorrect</option>
        </select>
      </label>
      <br />
      <label>
        Problem Solving Approach:
        <select name="problemSolvingApproach" value={formData.problemSolvingApproach} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Logical and Systematic">Logical and Systematic</option>
          <option value="Somewhat Logical">Somewhat Logical</option>
          <option value="Disorganized">Disorganized</option>
        </select>
      </label>
      <br />
      <label>
        Additional Notes:
        <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="4" cols="50" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AIMockInterviewForm;
