// src/view/family/Consult.jsx
import React, { useEffect, useState } from 'react';
import ChatWindow from '../../components/ChatWindow';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FamilyConsult = () => {
  const { user } = useSelector(s => s.auth);
  const [chatId, setChatId] = useState(null);
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dRes = await axios.get('/api/doctors');
      const pRes = await axios.get(`/api/elder/${user._id}`);
      setDoctors(dRes.data);
      setPatients(pRes.data);
    };
    fetchData();
  }, [user._id]);

  const startChat = async () => {
    if (!doctorId || !patientId) return;

    const { data } = await axios.post('/api/chat/create', {
      familyId: user._id,
      doctorId,
      patientId
    });

    setChatId(data._id);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>Consult a Doctor</h1>

      <div className='mb-4'>
        <select onChange={e => setDoctorId(e.target.value)} value={doctorId}>
          <option value=''>Select Doctor</option>
          {doctors.map(doc => (
            <option key={doc._id} value={doc._id}>{doc.name}</option>
          ))}
        </select>

        <select onChange={e => setPatientId(e.target.value)} value={patientId} className='ml-4'>
          <option value=''>Select Patient</option>
          {patients.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        <button onClick={startChat} className='ml-4 bg-green-600 text-white px-4 py-1 rounded'>
          Start Chat
        </button>
      </div>

      {chatId && <ChatWindow chatId={chatId} senderId={user._id} />}
    </div>
  );
};

export default FamilyConsult;
