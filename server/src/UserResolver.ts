import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from './entity/User';
import { MyContext } from './MyContext';
import { createRefreshToken, createAccessToken } from './auth';
import { isAuth } from './isAuth';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi!';
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    auth(@Ctx() { payload }: MyContext) {
        console.log(payload);
        return `Your user id is: ${payload!.userId}`;
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } });

        if(!user) {
            throw new Error ('Could not find user.');
        }

        const valid = await compare(password, user.password);

        if(!valid) {
            throw new Error ('Invalid password.');
        }

        // login successful

        res.cookie('jid', createRefreshToken(user), { httpOnly: true });

        return {
            accessToken: createAccessToken(user)
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Mutation(() => Boolean)
    async delete(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const user = await User.findOne({ where: { email } });

        if(!user) {
            throw new Error ('Could not find user.');
        }

        const valid = await compare(password, user.password);

        if(!valid) {
            throw new Error ('Invalid password.');
        }

        try {
            await User.delete(user.id)
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }
}