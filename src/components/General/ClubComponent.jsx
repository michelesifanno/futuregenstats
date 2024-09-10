export default function ClubComponent ({ name, id }) {

    const formatNameForUrl = name ? name.toLowerCase().replace(/\s+/g, '-') : 'default-name';
    
    const imageUrl = `https://res.cloudinary.com/dfe8fzdna/image/upload/v1724882443/${id}/${formatNameForUrl}.png`;

    return (
        <span
            style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid #f8f8f8'
            }}
        >
            <img
                src={imageUrl}
                alt={name || 'Team Logo'}
                style={{
                    width: '30px',
                    height: '30px',
                    objectFit: 'contain',
                }}
            />
        </span>
    );
};
