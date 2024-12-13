import React from 'react';
// Import profile pictures
import tino from '../images/tino.png';
import sarath from '../images/sarath.png';
import john from '../images/john.png';
import vikaas from '../images/vikaas.png';
import dharshu from '../images/dharshu.png';
import mathi from '../images/mathi.png';
import sridhar from '../images/sridhar.png';
import nandhini from '../images/nandhini.png';
import raagini from '../images/raagini.png';

const Contacts1 = () => {
  const contacts = [
    { name: 'Tino', sip: '701', img: tino },
    { name: 'Sarath', sip: '702', img: sarath },
    { name: 'John', sip: '703', img: john },
    { name: 'Vikaas', sip: '704', img: vikaas },
    { name: 'Dharshu', sip: '705', img: dharshu },
    { name: 'Mathi', sip: '706', img: mathi },
    { name: 'Sridhar', sip: '707', img: sridhar },
    { name: 'Nandhini', sip: '708', img: nandhini },
    { name: 'Raagini', sip: '709', img: raagini },
    { name: 'Tino', sip: '701', img: tino },
    { name: 'Sarath', sip: '702', img: sarath },
    { name: 'John', sip: '703', img: john },
    { name: 'Vikaas', sip: '704', img: vikaas },
    { name: 'Dharshu', sip: '705', img: dharshu },
    { name: 'Mathi', sip: '706', img: mathi },
    { name: 'Sridhar', sip: '707', img: sridhar },
    { name: 'Nandhini', sip: '708', img: nandhini },
    { name: 'Raagini', sip: '709', img: raagini },
    { name: 'Tino', sip: '701', img: tino },
    { name: 'Sarath', sip: '702', img: sarath },
    { name: 'John', sip: '703', img: john },
    { name: 'Vikaas', sip: '704', img: vikaas },
    { name: 'Dharshu', sip: '705', img: dharshu },
    { name: 'Mathi', sip: '706', img: mathi },
    { name: 'Sridhar', sip: '707', img: sridhar },
    { name: 'Nandhini', sip: '708', img: nandhini },
    { name: 'Raagini', sip: '709', img: raagini },
  ];

  return (
    <div className="grid grid-cols-4 gap-8">
      {contacts.map((contact) => (
        <div
          key={contact.sip}
          className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition"
        >
          <img
            src={contact.img}
            alt={contact.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <h3 className="mt-4 text-lg font-semibold text-gray-700">{contact.name}</h3>
          <p className="text-sm text-gray-500">SIP: {contact.sip}</p>
        </div>
      ))}
    </div>
  );
};

export default Contacts1;
