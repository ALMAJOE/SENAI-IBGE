import api from '../services/Api';
import { AsyncStorage } from 'react-native';

export default async function SearchController(name, birth, navigation) {
    const response = await api.get('/nomes/' + name);

    const getName = response.data[0].nome;

    const maximumSize = response.data[0].res.length;
    let maximumValue = response.data[0].res[0].frequencia;

    for(let i = 0; i < maximumSize; i++) {
        var aux = response.data[0].res[i].frequencia;

        if(maximumValue < aux) {
            var decade = response.data[0].res[i].periodo;
            maximumValue = aux;
        }
    }

    const timePeriodOne = decade.replace(/(\D)/g, ',').split(',')[1];
    const timePeriodTwo = decade.replace(/(\D)/g, ',').split(',')[2];
    const period = timePeriodOne + ' ' + timePeriodTwo;

    if(timePeriodOne <= birth && timePeriodTwo >= birth) {

        const description = '\t'+ 'A sua década foi a que mais nasceu ' + getName + ' com o total de: ' +maximumValue + ' pessoas neste periodo ('+period+').';
        
        await AsyncStorage.setItem('description', description);

        return navigation.navigate('Search', { header: null });
    }


    const description = '\t'+'Os anos que mais nasceram ' + getName + ' foi entre ' + period + ' com o total de: ' +maximumValue + ' pessoas  neste periodo.';
    await AsyncStorage.setItem('description', description);

    return navigation.navigate('Search', { header: null });
}