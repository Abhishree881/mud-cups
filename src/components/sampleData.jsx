const SampleData = [
    {
        index: 1,
        name: 'Main Course',
        items: [
            {
                index: 1,
                name: 'Kadhai Paneer',
                description: 'A North Indian dish made from farm fresh vegetables and cottage cheese',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 160.00,
                rating: 4.2,
                totalRatings: 74,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 95.50,
                        stackable: false,
                    }
                ]
            },
            {
                index: 2,
                name: 'Paneer Tikka Masala',
                description: 'A spicy North Indian dish made from fresh veggies and cottage cheese',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 160.00,
                rating: 4.5,
                totalRatings: 64,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 100.00,
                        stackable: false,
                    }
                ]
            },
            {
                index: 3,
                name: 'Butter Chicken',
                description: 'A spicy dish for the chicken lovers made with chicken',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: false,
                price: 180.00,
                rating: 4.4,
                totalRatings: 48,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 110.00,
                        stackable: false,
                    }
                ]
            },
            {
                index: 4,
                name: 'Chole Bhature (2 Pcs)',
                description: 'A great punjabi dish for all the chola loving people',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 140.00,
                rating: 3.6,
                totalRatings: 24,
                addOn: [
                    {
                        index: 1,
                        name: 'Bhatura',
                        cost: 50.00,
                        stackable: true,
                    },
                    {
                        index: 2,
                        name: 'Chole',
                        cost: 30.00,
                        stackable: true,
                    }
                ]
            },
            {
                index: 5,
                name: 'Masala Dosa',
                description: 'One of the finest dishes of the town is here for you',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.8,
                totalRatings: 127,
                addOn: [],
            },
        ]
    },
    {
        index: 2,
        name: 'Starters',
        items: [
            {
                index: 1,
                name: 'Chilli Chicken',
                description: 'A spicy starter involving masaledaar chicken as appetizer',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: false,
                price: 200.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 100.00,
                        stackable: false,
                    }
                ]
            },
            {
                index: 2,
                name: 'Chilli Potato',
                description: 'A spicy starter involving masaledaar chicken as appetizer',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 180.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 100.00,
                        stackable: false,
                    }
                ]
            },
            {
                index: 3,
                name: 'Chilli Paneer',
                description: 'A spicy starter involving masaledaar chicken as appetizer',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 200.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 100.00,
                        stackable: false,
                    }
                ]
            },
            {
                index: 4,
                name: 'Chicken Manchurian',
                description: 'A spicy starter involving masaledaar chicken as appetizer',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: false,
                price: 250.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 100.00,
                        stackable: false,
                    }
                ]
            },
            {
                index: 5,
                name: 'Veg Manchurian',
                description: 'A spicy starter involving masaledaar chicken as appetizer',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 200.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: [
                    {
                        index: 1,
                        name: 'Full Plate',
                        cost: 100.00,
                        stackable: false,
                    }
                ]
            },

        ]
    },
    {
        index: 3,
        name: 'Drinks',
        items: [
            {
                index: 1,
                name: 'Blue Lagoon',
                description: 'Blue drink',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
            {
                index: 2,
                name: 'Coffee',
                description: 'Coffee hai bhai',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
            {
                index: 3,
                name: 'Bisleri water',
                description: 'Thanda paani',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
            {
                index: 4,
                name: 'Sprite',
                description: 'Cold drink',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
            {
                index: 1,
                name: 'Dew',
                description: 'Cold drink',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
        ]
    },
    {
        index: 4,
        name: 'Desserts',
        items: [
            {
                index: 1,
                name: 'Ice cream',
                description: 'Ye bhi batau kya',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
            {
                index: 2,
                name: 'Rasgulla',
                description: 'Coz I like it',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
        ],
    },
    {
        index: 5,
        name: 'Salads',
        items: [
            {
                index: 1,
                name: 'Pyaaz',
                description: 'Extra nhi milega',
                imgUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_tikka_biryani_zdish.png',
                isVeg: true,
                price: 100.00,
                rating: 4.5,
                totalRatings: 6,
                addOn: []
            },
        ],
    }
]

export default SampleData