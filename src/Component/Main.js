import React, {useState} from 'react'
import { Icon } from '@iconify/react';
import calculatorIcon from '@iconify-icons/mdi/calculator';
import { Modal, ModalBody} from 'reactstrap';
import Calculator from './Calculator';
import { useSelector} from 'react-redux';

function Main(props) {

    const { className } = props;
      
    const [modal, setModal] = useState(false);
    const [totalValue,setTotalValue] = useState(null);
      
    const toggle = () => setModal(!modal);

    const update = (values) => {
        setTotalValue(values);
    }

    return (
        <div>
            <input type="text" value={totalValue} />
            <Icon icon={calculatorIcon} onClick={toggle}/>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalBody>
                    <Calculator toggleFunction={toggle} updateTotalValue = {update}/>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Main
