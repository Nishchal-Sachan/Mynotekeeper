import React from 'react';

const Pagination = ({ currentPage, setPage, totalPages }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setPage(currentPage + 1);
        }
    };

    return (
        <div style={styles.paginationContainer}>
            <button
                style={{ ...styles.button, opacity: currentPage === 1 ? 0.5 : 1 }}
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span style={styles.pageIndicator}>Page {currentPage} of {totalPages}</span>
            <button
                style={{ ...styles.button, opacity: currentPage === totalPages ? 0.5 : 1 }}
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

const styles = {
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16px',
    },
    button: {
        padding: '8px 16px',
        margin: '0 8px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
    },
    pageIndicator: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default Pagination;
