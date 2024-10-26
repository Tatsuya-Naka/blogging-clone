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
        include: {
            commentlikes: user ? {
                select: { id: true, userId: true },
                where: { userId: user.id },
                take: 1,
            } : undefined,
            _count: { select: { commentlikes: { where: { topicId } } } },
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
        include: {
            commentlikes: user ? {
                select: { id: true, userId: true },
                where: { userId: user.id },
                take: 1,
            } : undefined,
            _count: { select: { commentlikes: { where: { topicId } } } },
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
        include: {
            commentlikes: user ? {
                select: { id: true, userId: true },
                where: { userId: user.id },
                take: 1,
            } : undefined,
            _count: { select: { commentlikes: { where: { topicId } } } },
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
                        <CommentItem comment={{
                            ...ancestor,
                            content: ancestor.deleted ? "Comment deleted" : ancestor.content
                        }} user={user} topicId={topicId} />
                        {
                            commentOfParent.filter(parent => ancestor.id === parent.parentId)
                                .map((parent) => {
                                    return (
                                        <div key={parent.id}>
                                            <CommentItem comment={{
                                                ...parent,
                                                content: parent.deleted ? "Comment deleted" : parent.content
                                            }} user={user} topicId={topicId} />
                                            {
                                                commentOfChildren.filter(children => (parent.id === children.parentId && ancestor.id === children.ancestorId)
                                                    || (parent.id === children.leafId && ancestor.id === children.ancestorId)
                                                )
                                                    .map((children) => {
                                                        return (
                                                            <div key={children.id}>
                                                                <CommentItem comment={{
                                                                    ...children,
                                                                    content: children.deleted ? "Comment deleted" : children.content
                                                                }} user={user} topicId={topicId} />
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