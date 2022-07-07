//comment schema
export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string'
        },
        // {
        //     name: 'approved',
        //     title: 'Approved',
        //     type: 'boolean',
        //     description: "Is this comment approved?"
        // },
        {
            name: 'comment',
            title: 'Comment',
            type: 'text'
        },
        {
            name: 'post',
            title: 'Post',
            type: 'reference',
            to: {
                type: 'post'
            }
        },
    ],

}