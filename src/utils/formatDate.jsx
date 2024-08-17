import { format } from 'date-fns';
import { it } from 'date-fns/locale'; // Per l'italiano, puoi cambiare a seconda della lingua

export default function formatDate (timestamp) {
    try {
        const date = new Date(timestamp);
        return format(date, 'dd MMMM yyyy', { locale: it }); // Personalizza il formato se necessario
    } catch (error) {
        console.error('Errore nella formattazione della data:', error);
        return 'N/A';
    }
};