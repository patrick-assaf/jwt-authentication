import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from './entity/User';
import { myContext } from './myContext';

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

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}: myContext
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

        res.cookie('jid', sign({ userId: user.id }, 'wlatokhowlaksorlomokho', { expiresIn: '7d' }), 
           {
               httpOnly: true,
           });

        return {
            accessToken: sign({ userId: user.id }, 'oppalissaya3issa', { expiresIn: '15m' })
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
}