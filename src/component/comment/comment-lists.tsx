    import { db } from "~/server/db";
import CommentItem from "./comment-item";

interface CommentListsProps {
    topicId: string;
    user?: {
        image?: string,
        id: string,
    }
}

export default async function CommentLists({ topicId, user }: CommentListsProps) {
    const commentOfAncestor = await db.comment.findMany({
        where: {
            topicId,
            AND: [
                {
                    OR: [
                        { parentId: null },
                        { parentId: '' },
                    ],
                },
                {
                    OR: [
                        { ancestorId: null },
                        { ancestorId: '' },
                    ]
                }
            ]
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    const commentOfParent = await db.comment.findMany({
        where: {
            topicId,
            AND: [
                {
                    OR: [
                        { ancestorId: null },
                        { ancestorId: '' },
                    ],
                },
                {
                    parentId: {
                        not: null,
                    }
                }
            ]
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    const commentOfChildren = await db.comment.findMany({
        where: {
            topicId,
            AND: [
                {
                    OR: [
                        { ancestorId: { not: null } }
                    ],
                },
                {
                    parentId: { not: null }
                }
            ]
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    return (
        <div>
            {commentOfAncestor.map((ancestor) => {
                return (
                    <div key={ancestor.id}>
                        <CommentItem comment={ancestor} user={user} />
                        {
                            commentOfParent.filter(parent => ancestor.id === parent.parentId)
                                .map((parent) => {
                                    return (
                                        <div key={parent.id}>
                                            <CommentItem comment={parent} user={user} />
                                            {
                                                commentOfChildren.filter(children => (parent.id === children.parentId && ancestor.id === children.ancestorId)
                                                || (parent.id === children.leafId && ancestor.id === children.ancestorId)
                                            )
                                                    .map((children) => {
                                                        return (
                                                            <div key={children.id}>
                                                                <CommentItem comment={children} user={user} />
                                                            </div>
                                                        )

                                                    })
                                            }
                                        </div>
                                    );
                                })
                        }
                    </div>
                );
            })}
        </div>
    )
}