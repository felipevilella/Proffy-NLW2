import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';
import Input from '../../components/input';
import warningIcon from '../../assets/images/icons/warning.svg';



function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');



    const [scheduleItens, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''}
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItens,
            {week_day: 0, from: '', to: ''}
        ]);
    }

    function setScheduleItemValue(position:number, field: string , value: string) {
        const updateScheduleItens = scheduleItens.map((scheduleItem, index) => {
            if(index === position) {
                return {...scheduleItem, [field]: value};
            }

            return scheduleItem;
        })

        setScheduleItems(updateScheduleItens);
    }

    function handCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp:whatsApp,
            bio,
            subject,
            cost: Number(cost),
            schedule:scheduleItens
        }).then(() => {
            alert("Cadastro realizado com successo!");
            history.push('/');
        }).catch(() => {
            alert("erro no cadasto!");
        });

  
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrivel que você quer dar aulas"
            description="O primeiro passso é preencher esse formulario de inscrição"/>

            <main>
                <form onSubmit={handCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input name="name" label="Nome Completo" 
                        value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <Input name="Avatar" label="Avatar" 
                        value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
                    <Input name="whatsApp" label="whatsApp" 
                        value={whatsApp} onChange={(e) => {setWhatsApp(e.target.value)}}/>
                    <Textarea name="bio" label="Biografia" 
                        value={bio} onChange={(e) => {setBio(e.target.value)}}/>
                </fieldset>

                <fieldset>
                    <legend>Sobre a Aula</legend>
                    <Select name="subject"
                        label="Materia"
                        value={subject} 
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                            {value:'Artes', label:'Artes'},
                            {value:'Biologia', label:'Biologia'},
                            {value:'Ciências', label:'Ciências'},
                            {value:'Educação Física', label:'Educação Física'},
                            {value:'Fisica', label:'Fisica'},
                            {value:'Geografia', label:'Geografia'},
                            {value:'História', label:'História'},
                            {value:'Matemática', label:'Matemática'},
                            {value:'Português', label:'Português'},
                            {value:'Quimica', label:'Quimica'},
                        ]}/>
                    <Input name="cost" label="Custo da sua hora por aula" 
                        value={cost} onChange={(e) => {setCost(e.target.value)}}/>
                </fieldset>
                
                <fieldset>
                    <legend>
                        Horários disponiveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo Horario</button>
                    </legend>
                   <div></div>
                    {scheduleItens.map((scheduleItem, index) => {
                      return(
                        <div key={scheduleItem.week_day} className="schedule-item">
                            <Select name="week_day"
                                label="Dia da Semana"
                                value={scheduleItem.week_day}
                                onChange = {e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[
                                    {value:'0', label:'Domingo'},
                                    {value:'1', label:'Segunda-Feira'},
                                    {value:'2', label:'Terça-Feira'},
                                    {value:'3', label:'Quarta-Feira'},
                                    {value:'4', label:'Quinta-Feira'},
                                    {value:'5', label:'Sexta-Feira'},
                                    {value:'6', label:'Sabado'},
                            ]}/>

                            <Input name="from" label="Das" type="time" 
                                onChange = {e => setScheduleItemValue(index, 'from', e.target.value)}
                                value={scheduleItem.from}
                            />
                            <Input name="to" label="Até" type="time" 
                                onChange = {e => setScheduleItemValue(index, 'to', e.target.value)}
                                value={scheduleItem.to}
                            />
                        </div>
                      );
                    })}
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante<br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit"> Salvar cadastro</button>
                </footer>
            </form>
            </main>
        </div>
    )
}

export default TeacherForm;