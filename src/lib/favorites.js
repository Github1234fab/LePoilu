import { db } from './firebase';
import { 
    doc, 
    updateDoc, 
    setDoc as firestoreSetDoc, 
    arrayUnion, 
    arrayRemove, 
    getDoc 
} from 'firebase/firestore';

/**
 * Toggles a sponsor ID in the user's favoriteSponsors list in Firestore.
 * @param {string} userId - The Firebase UID of the user.
 * @param {string} sponsorId - The ID of the sponsor (from Sponsors collection).
 * @param {boolean} isCurrentlyFavorite - Current state in UI.
 */
export async function toggleSponsorFavorite(userId, sponsorId, isCurrentlyFavorite) {
    if (!userId) return;

    const userRef = doc(db, 'Users', userId);
    
    try {
        if (isCurrentlyFavorite) {
            await updateDoc(userRef, {
                favoriteSponsors: arrayRemove(sponsorId)
            });
        } else {
            // Utiliser setDoc avec merge: true pour créer le document s'il n'existe pas
            await firestoreSetDoc(userRef, {
                favoriteSponsors: arrayUnion(sponsorId)
            }, { merge: true });
        }
        return true;
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
}

/**
 * Fetches the list of favorite sponsor IDs for a given user.
 * @param {string} userId 
 */
export async function getFavoriteSponsors(userId) {
    if (!userId) return [];
    
    try {
        const userSnap = await getDoc(doc(db, 'Users', userId));
        if (userSnap.exists()) {
            return userSnap.data().favoriteSponsors || [];
        }
        return [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
}
